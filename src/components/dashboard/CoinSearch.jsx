import React, { useState, useEffect, useRef } from 'react';
import dashboardApi from '../../api/dashboardApi';

const CoinSearch = ({ onSelectCoin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const firstRender = useRef(true);
  const searchRef = useRef(null);

  // Load recent searches from sessionStorage on component mount
  useEffect(() => {
    const savedSearches = sessionStorage.getItem('recentCoinSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
        sessionStorage.removeItem('recentCoinSearches');
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCoinSearch = async (term) => {
    if (!term.trim()) return;
    setError(null);
    try {
      const params = { keyword: term, quoteSymbol: 'KRW' };
      const response = await dashboardApi.searchCoins(params);

      if (response && response.status === "success" && response.data) {
        const coinsData = Array.isArray(response.data) ? response.data : [response.data];
        setSearchResults(coinsData);
        setShowDropdown(true);
      } else {
        setError("코인을 찾을 수 없습니다.");
        setShowDropdown(false);
      }
    } catch (err) {
      setError("코인을 찾을 수 없습니다.");
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 2) {
        handleCoinSearch(searchTerm);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleResultSelect = (coin) => {
    if (!coin) return;
    setSearchTerm(coin.name);
    setShowDropdown(false);
    if (onSelectCoin) onSelectCoin(coin);
    updateRecentSearches(coin);
  };

  const updateRecentSearches = (coinData) => {
    if (!coinData || !coinData.coinId) return;
    
    // Update state
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item && item.coinId !== coinData.coinId);
      const updatedSearches = [coinData, ...filtered].slice(0, 5);
      
      // Save to sessionStorage
      sessionStorage.setItem('recentCoinSearches', JSON.stringify(updatedSearches));
      
      return updatedSearches;
    });
  };

  const handleRecentCoinSelect = (coin) => {
    if (!coin) return;
    setSearchTerm(coin.name);
    if (onSelectCoin) onSelectCoin(coin);
  };

  // This was originally resetting search history on first render
  // Now we'll only reset if explicitly needed or if there's an error
  useEffect(() => {
    if (firstRender.current) {
      // Check if there's already data in sessionStorage instead of clearing it
      const existingSearches = sessionStorage.getItem('recentCoinSearches');
      if (!existingSearches) {
        // Only initialize with empty array if no data exists
        sessionStorage.setItem('recentCoinSearches', JSON.stringify([]));
      }
      firstRender.current = false;
    }
  }, []);

  const formatPrice = (price) => (!price ? '-' : price.toLocaleString());

  return (
      <div className="bg-blue-900 rounded-lg p-4 h-[464px] flex flex-col">
        <div className="relative mb-2" ref={searchRef}>
          <input
              type="text"
              placeholder="코인명 또는 코드"
              className="w-full py-2 px-4 pr-10 rounded-md bg-blue-950 text-white border border-blue-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCoinSearch(searchTerm)}
              onClick={() => searchResults.length > 0 && setShowDropdown(true)}
          />

          {showDropdown && searchResults.length > 0 && !error && (
              <div className="absolute z-10 mt-1 w-full bg-[#192339] rounded-md shadow-lg max-h-60 overflow-y-auto border border-blue-600">
                {searchResults.map((result) => (
                    <div
                        key={result.coinId}
                        className="p-3 hover:bg-blue-700 cursor-pointer border-b border-blue-700"
                        onClick={() => handleResultSelect(result)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 w-6 h-6 rounded-full overflow-hidden">
                            <img
                                src={`https://static.upbit.com/logos/${result.symbol}.png`}
                                alt="logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentNode.innerHTML = `<div class='bg-yellow-400 w-full h-full flex items-center justify-center'><span class='text-black font-bold text-xs'>${result.symbol.charAt(0)}</span></div>`;
                                }}
                            />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{result.name}</h4>
                            <p className="text-gray-400 text-xs">{result.symbol}</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">{formatPrice(result.price)}</p>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {showDropdown && searchTerm.length >= 2 && searchResults.length === 0 && !error && (
              <div className="absolute z-10 mt-1 w-full bg-blue-950 rounded-md p-3 text-gray-400 text-center border border-blue-600">
                검색 결과가 없습니다.
              </div>
          )}
        </div>

        <div className="mt-4 flex-grow flex flex-col">
          <h3 className="text-white text-sm font-medium mb-2">최근 검색 기록</h3>
          <div className="overflow-y-auto flex-grow" style={{ maxHeight: '320px' }}>
            {recentSearches.length > 0 ? (
                <div className="space-y-2">
                  {recentSearches.map((coin) => (
                      <div
                          key={coin.coinId}
                          className="bg-blue-950 rounded-md p-3 flex items-center justify-between cursor-pointer hover:bg-blue-800"
                          onClick={() => handleRecentCoinSelect(coin)}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 w-6 h-6 rounded-full overflow-hidden">
                            <img
                                src={`https://static.upbit.com/logos/${coin.symbol}.png`}
                                alt="logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentNode.innerHTML = `<div class='bg-yellow-400 w-full h-full flex items-center justify-center'><span class='text-black font-bold text-xs'>${coin.symbol.charAt(0)}</span></div>`;
                                }}
                            />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{coin.name}</h4>
                            <p className="text-gray-400 text-xs">{coin.symbol}/KRW</p>
                          </div>
                        </div>
                        <p className="text-white font-medium">{formatPrice(coin.price)}</p>
                      </div>
                  ))}
                </div>
            ) : (
                <div className="bg-blue-950 rounded-md p-3 text-gray-400 text-center">
                  <p>검색 기록이 없습니다</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default CoinSearch;