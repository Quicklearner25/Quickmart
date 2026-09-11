import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Check, 
  Plus, 
  Navigation, 
  Building2, 
  Home, 
  Compass, 
  Search,
  Clock,
  Edit2,
  Loader2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAVED_LOCATIONS, POPULAR_CITIES } from '../data/products';
import { DeliveryLocation } from '../types';

export const LocationModal: React.FC = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    selectedLocation, 
    setSelectedLocation 
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(selectedLocation.city || 'Bengaluru');
  
  // Load saved addresses from localStorage or default
  const [savedAddresses, setSavedAddresses] = useState<DeliveryLocation[]>(() => {
    try {
      const stored = localStorage.getItem('quickmart_custom_locations');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return SAVED_LOCATIONS;
  });

  // State for adding or editing an address
  const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTag, setFormTag] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [formFlat, setFormFlat] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formLandmark, setFormLandmark] = useState('');
  const [formCity, setFormCity] = useState(selectedLocation.city || 'Bengaluru');
  const [formPincode, setFormPincode] = useState(selectedLocation.pincode || '560103');

  // GPS detection state
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsSuccessNotice, setGpsSuccessNotice] = useState<string | null>(null);

  // Sync saved addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quickmart_custom_locations', JSON.stringify(savedAddresses));
    } catch {
      // ignore
    }
  }, [savedAddresses]);

  if (!isLocationModalOpen) return null;

  const filteredLocations = savedAddresses.filter(
    (loc) =>
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.pincode.includes(searchQuery)
  );

  const handleSelectLocation = (loc: DeliveryLocation) => {
    setSelectedLocation(loc);
    setIsLocationModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setIsEditingOrAdding(false);
    setEditingId(null);
    setFormFlat('');
    setFormStreet('');
    setFormLandmark('');
    setFormTag('Home');
    setGpsError(null);
    setGpsSuccessNotice(null);
  };

  // Open edit mode for an existing address
  const handleStartEdit = (loc: DeliveryLocation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(loc.id);
    setFormTag(loc.tag);

    // Extract flat vs street if formatted with comma
    const parts = loc.address.split(', ');
    if (parts.length > 1) {
      setFormFlat(parts[0]);
      setFormStreet(parts.slice(1).join(', '));
    } else {
      setFormFlat('');
      setFormStreet(loc.address);
    }

    setFormCity(loc.city);
    setFormPincode(loc.pincode);
    setFormLandmark('');
    setGpsError(null);
    setGpsSuccessNotice(null);
    setIsEditingOrAdding(true);
  };

  // Open add new address mode
  const handleStartAddNew = () => {
    resetForm();
    setFormCity(selectedCity);
    setIsEditingOrAdding(true);
  };

  // Save modified or newly added address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStreet.trim()) return;

    const fullAddress = [
      formFlat.trim(),
      formStreet.trim(),
      formLandmark.trim() ? `Near ${formLandmark.trim()}` : '',
    ]
      .filter(Boolean)
      .join(', ');

    const etaMins = 7 + Math.floor(Math.random() * 6);

    if (editingId) {
      // Update existing address
      const updatedList = savedAddresses.map((loc) => {
        if (loc.id === editingId) {
          return {
            ...loc,
            tag: formTag,
            label: `${formTag} - ${formStreet.slice(0, 20)}`,
            address: fullAddress,
            city: formCity,
            pincode: formPincode || '560001',
          };
        }
        return loc;
      });

      const updatedActive = updatedList.find((l) => l.id === editingId);
      setSavedAddresses(updatedList);
      if (updatedActive) {
        setSelectedLocation(updatedActive);
      }
    } else {
      // Create new address
      const newLoc: DeliveryLocation = {
        id: `loc-custom-${Date.now()}`,
        tag: formTag,
        label: `${formTag} - ${formStreet.slice(0, 20)}`,
        address: fullAddress,
        city: formCity,
        pincode: formPincode || '560001',
        eta: `${etaMins} mins`,
      };

      setSavedAddresses([newLoc, ...savedAddresses]);
      setSelectedLocation(newLoc);
    }

    setIsLocationModalOpen(false);
    resetForm();
  };

  // Accurate GPS Geolocation Detection
  const handleUseCurrentLocation = () => {
    setGpsError(null);
    setGpsSuccessNotice(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser. Please enter your address manually.');
      setIsEditingOrAdding(true);
      return;
    }

    setIsDetectingGps(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Call verified backend reverse-geocoding API for high accuracy
          const res = await fetch(`/api/delivery/reverse-geocode?lat=${latitude}&lng=${longitude}`);
          const geoData = await res.json().catch(() => ({}));

          if (res.ok && geoData.success) {
            setFormStreet(geoData.street || geoData.area || 'Current Street');
            setFormCity(geoData.city || selectedCity);
            setFormPincode(geoData.pincode || '560001');
            setFormTag('Home');
            setFormFlat('');
            setFormLandmark('');

            setGpsSuccessNotice(
              `Pinpoint GPS located: ${geoData.displayName || geoData.street}. Modify details below to confirm delivery.`
            );
          } else {
            // Direct GPS coordinates fallback
            setFormStreet(`Near GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
            setFormCity(selectedCity);
            setGpsSuccessNotice('GPS coordinates detected. Please add your flat and street number to finalize.');
          }
        } catch {
          setFormStreet(`Near GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          setFormCity(selectedCity);
          setGpsSuccessNotice('GPS coordinates detected. Please add your flat and street number to finalize.');
        } finally {
          setIsDetectingGps(false);
          setIsEditingOrAdding(true);
        }
      },
      (err) => {
        setIsDetectingGps(false);
        let message = 'Unable to fetch current location.';
        if (err.code === err.PERMISSION_DENIED) {
          message = 'Location access was denied. Please select your city or modify/enter your address manually.';
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out. Please enter or select your delivery address below.';
        }
        setGpsError(message);
        setIsEditingOrAdding(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="location-modal-container"
        className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              {isEditingOrAdding ? (editingId ? 'Modify Delivery Address' : 'Add / Confirm Address') : 'Select Delivery Location'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditingOrAdding 
                ? 'Update flat number, street and landmark for accurate 10-min delivery'
                : '10-minute grocery delivery guaranteed in selected service zones'}
            </p>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={() => {
              setIsLocationModalOpen(false);
              resetForm();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Geolocation Notices */}
          {gpsError && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{gpsError}</span>
            </div>
          )}

          {gpsSuccessNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{gpsSuccessNotice}</span>
            </div>
          )}

          {/* If In Add/Edit Mode */}
          {isEditingOrAdding ? (
            <form onSubmit={handleSaveAddress} className="space-y-4 animate-in fade-in">
              <div className="bg-orange-50/60 border border-orange-200 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Address Category</span>
                  <div className="flex gap-1.5">
                    {(['Home', 'Work', 'Other'] as const).map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormTag(t)}
                        className={`text-xs px-3 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                          formTag === t
                            ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Flat / House No / Apartment / Floor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 402, Tower B, Palm Heights"
                    value={formFlat}
                    onChange={(e) => setFormFlat(e.target.value)}
                    className="w-full bg-white text-xs p-2.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Street / Society / Area Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100 Feet Road, 4th Block, Koramangala"
                    value={formStreet}
                    onChange={(e) => setFormStreet(e.target.value)}
                    className="w-full bg-white text-xs p-2.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nearby Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opposite Sony Signal, Near Cafe Coffee Day"
                    value={formLandmark}
                    onChange={(e) => setFormLandmark(e.target.value)}
                    className="w-full bg-white text-xs p-2.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-white text-xs p-2.5 rounded-lg border border-slate-200 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="e.g. 560034"
                      value={formPincode}
                      onChange={(e) => setFormPincode(e.target.value)}
                      className="w-full bg-white text-xs p-2.5 rounded-lg border border-slate-200 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Save & Deliver Here
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Current GPS button with Real Geolocation */}
              <button
                id="use-current-location-btn"
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isDetectingGps}
                className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-orange-200 bg-orange-50/70 hover:bg-orange-100 text-orange-700 font-semibold text-sm transition-all group cursor-pointer disabled:opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-xs">
                    {isDetectingGps ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      {isDetectingGps ? 'Detecting Precise Location...' : 'Use Current GPS Location'}
                    </div>
                    <div className="text-[11px] text-orange-600/80 font-normal">
                      {isDetectingGps ? 'Connecting to GPS sensor & geocoding...' : 'Pinpoint accurate detection for instant delivery'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-2xs">
                  {isDetectingGps ? 'Detecting...' : 'Detect'}
                </span>
              </button>

              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apartment, road, area or pincode..."
                  className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

              {/* Popular Cities */}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Metro City
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setFormCity(city);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedCity === city
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saved Addresses List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Saved Delivery Addresses
                  </span>
                  <button
                    type="button"
                    onClick={handleStartAddNew}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                </div>

                <div className="space-y-2">
                  {filteredLocations.map((loc) => {
                    const isSelected = selectedLocation.id === loc.id;
                    const TagIcon = loc.tag === 'Home' ? Home : loc.tag === 'Work' ? Building2 : Compass;

                    return (
                      <div
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-stone-50/70'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <TagIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold text-slate-900">{loc.label}</span>
                              <span className="text-[10px] font-extrabold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" /> {loc.eta}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                              {loc.address}, {loc.city} - {loc.pincode}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                          {/* Explicit Modify / Edit button */}
                          <button
                            type="button"
                            onClick={(e) => handleStartEdit(loc, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                            title="Modify this address"
                            aria-label={`Modify address ${loc.label}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredLocations.length === 0 && (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No matching addresses found for "{searchQuery}".
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
