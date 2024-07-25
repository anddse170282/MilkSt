import React, { useState, useEffect, useCallback } from 'react';
import { fetchMilks, fetchMilkTypes } from '../api/milkService';
import { getAllBrands } from '../api/brandService';
import { useLocation } from 'react-router-dom';
import '../css/searchpage.css';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('tất cả');
  const [milkTypes, setMilkTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    milkType: [],
    brand: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [milkTypesData, brandsData] = await Promise.all([
          fetchMilkTypes(),
          getAllBrands(),
        ]);
        setMilkTypes(milkTypesData);
        setBrands(brandsData);
      } catch (err) {
        console.error('Error fetching filter data:', err);
      }
    };

    fetchFiltersData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const milkTypeId = params.get('milkTypeId');
    setKeyword(search || '');

    if (milkTypeId) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        milkType: [milkTypeId],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        milkType: [],
      }));
    }
  }, [location.search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        isDescending: sortOption === 'giá cao - thấp',
        pageIndex: page,
        pageSize: 15,
        brandId: filters.brand.length ? filters.brand.join(',') : undefined,
        milkType: filters.milkType.length ? filters.milkType.join(',') : undefined,
      };

      if (keyword) {
        params.filter = keyword;
      }

      if (!keyword && !filters.milkType.length) {
        // Nếu không có keyword và milkType thì không fetch
        setProducts([]);
        setLoading(false);
        return;
      }

      if (sortOption === 'tất cả') {
        delete params.isDescending;
      }

      const data = await fetchMilks(params);
      setProducts(data);
      setHasMore(data.length === 15); // Assuming that if the number of products fetched is less than the pageSize, there's no more data
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

  // Trigger fetchProducts when keyword, page, sortOption, or filters change
  useEffect(() => {
    if (keyword || filters.milkType.length) {
      fetchProducts();
    }
  }, [keyword, page, sortOption, filters, fetchProducts]);



  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedCategory = prevFilters[category] === value
        ? ''
        : value;
      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  // const handleFilterChange = (category, value) => {
  //   setFilters((prevFilters) => {
  //     const updatedCategory = prevFilters[category].includes(value)
  //       ? prevFilters[category].filter((item) => item !== value)
  //       : [...prevFilters[category], value];
  //     return { ...prevFilters, [category]: updatedCategory };
  //   });
  // };
  
  const formatPrice = (amount) => {
    const formatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formatted.replace(/\./g, ' ');
  };

  return (
    <div className="search-page">
      <header>
        <h1>Tìm kiếm sản phẩm với từ khóa "{keyword}"</h1>
      </header>
      <div className="search-controls-pagination">
        <div className="search-controls">
          {['tất cả', 'giá thấp - cao', 'giá cao - thấp'].map(option => (
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
          <button onClick={() => setPage(page + 1)} disabled={!hasMore}>
            Trang sau
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="col-md-3 filters">
          <div className="filter-category">
            <h3>Loại sữa</h3>
            {milkTypes.map(milkType => (
              <label key={milkType.milkTypeId}>
                <input
                  type="checkbox"
                  value={milkType.milkTypeId}
                  checked={filters.milkType === milkType.milkTypeId} // Chỉ có một checkbox được chọn
                  onChange={() => handleFilterChange('milkType', milkType.milkTypeId)}
                />
                {milkType.typeName}
              </label>
            ))}
          </div>

          <div className="filter-category">
            <h3>Thương hiệu</h3>
            {brands.map(brand => (
              <label key={brand.brandId}>
                <input
                  type="checkbox"
                  value={brand.brandId}
                  checked={filters.brand === brand.brandId} // Chỉ có một checkbox được chọn
                  onChange={() => handleFilterChange('brand', brand.brandId)}
                />
                {brand.brandName}
              </label>
            ))}
          </div>
        </div>

        <div className="col-md-9 products-section">
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div className="product-item" key={product.milkId}>
                  {product.milkPictures && product.milkPictures.length > 0 && (
                    <a className="imageproduct-item" href={`/product-info/${product.milkId}`} key={product.milkPictures[0].milkPictureId}>
                      <img
                        src={product.milkPictures[0].picture}
                        alt={product.milkName}
                        className="product-image"
                      />
                    </a>
                  )}
                  <p className="product-name">{product.milkName}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
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
