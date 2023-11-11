import React from 'react';

interface FilterFilmProps {
  onGenreChange: any;
  onCountryChange: any;
  onSortChange: any;
}

const FilterFilm: React.FC<FilterFilmProps> = ({
  onSortChange,
  onGenreChange,
  onCountryChange,
}) => {
  const handleSortChange = (e: any) => {
    onSortChange(e.target.value);
  };

  const handleGenreChange = (e: any) => {
    onGenreChange(e.target.value);
  };

  const handleCountryChange = (e: any) => {
    onCountryChange(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4 px-4 md:px-16 py-6 flex-row transition duration-500">
      <label htmlFor="sort" className="text-white">
        Sắp xếp:
      </label>
      <select id="sort" onChange={handleSortChange} className="border p-2 rounded">
        <option value="newest">Mới nhất</option>
        <option value="oldest">Cũ nhất</option>
      </select>

      <label htmlFor="genre" className="text-white">
        Thể loại:
      </label>
      <select id="genre" onChange={handleGenreChange} className="border p-2 rounded">
        <option value="action">Hành động</option>
        <option value="drama">Chính kịch</option>
        {/* Thêm các thể loại khác */}
      </select>

      <label htmlFor="country" className="text-white">
        Quốc gia:
      </label>
      <select id="country" onChange={handleCountryChange} className="border p-2 rounded">
        <option value="us">Mỹ</option>
        <option value="uk">Anh</option>
        {/* Thêm các quốc gia khác */}
      </select>
    </div>
  );
};

export default FilterFilm;
