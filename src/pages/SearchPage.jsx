import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/SearchPage.css';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('bán chạy');
  const [filters, setFilters] = useState({
    origin: [],
    type: [],
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://localhost:7188/api/milks', {
        params: {
          keyword: keyword,
          page: page,
          sort: sortOption,
          filters: filters,
        },
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        setError('Lỗi phản hồi từ máy chủ: ' + error.response.data);
      } else if (error.request) {
        setError('Không nhận được phản hồi từ máy chủ: ' + error.request);
      } else {
        setError('Lỗi khi thiết lập yêu cầu: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [keyword, page, sortOption, filters]);

  // Debounce function to prevent excessive API calls
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [fetchProducts]);

  useEffect(() => {
    debouncedFetchProducts();
  }, [keyword, page, sortOption, filters, debouncedFetchProducts]);

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];
      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  return (
    <div className="search-page">
      <header>
        <h1>Tìm kiếm sản phẩm với từ khóa "{keyword}"</h1>
      </header>
      <div className="search-controls-pagination">
        <div className="search-controls">
          {['phù hợp', 'bán chạy', 'hàng mới', 'giá thấp - cao', 'giá cao - thấp'].map(option => (
            <button
              key={option}
              className={`sort-button ${sortOption === option ? 'active' : ''}`}
              onClick={() => setSortOption(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Trang trước
          </button>
          <span>Trang {page}</span>
          <button onClick={() => setPage(page + 1)}>Trang sau</button>
        </div>
      </div>
      <div className="main-content">
        <div className="filters">
          <div className="filter-category">
            <h3>Loại sữa</h3>
            {['Sữa bột', 'Sữa tươi', 'Sữa chua', 'Sữa hạt dinh dưỡng'].map(option => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={() => handleFilterChange('origin', option)}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="filter-category">
            <h3>Thương hiệu</h3>
            {['Sữa Vinamilk ', 'Sữa Nutifood', 'Sữa Dutch Lady', 'Sữa Vinamilk ', 'Sữa Nestle', 'Sữa Nutricare', 'Sữa Abbott ', 'Sữa Abbott ', 'Sữa TH true milk ', 'Sữa Fami ', 'Sữa VPMilk '].map(option => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={() => handleFilterChange('type', option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="products-section">
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div className="product-item" key={product.milkId}>
                  {product.milkPictures && product.milkPictures.length > 0 && (
                    <a href="/" key={product.milkPictures[0].milkPictureId}>
                      <img
                        src={product.milkPictures[0].picture}
                        alt={product.milkName}
                        className="product-image"
                      />
                      {product.price}.vnđ
                    </a>
                  )}
                  <p className="product-name">{product.milkName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
