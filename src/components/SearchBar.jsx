"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Search, X } from "lucide-react"
import { setSearchTerm, clearSearch } from "../redux/slices/menuSlice"

const SearchBar = ({ placeholder, className = "", onSearch, border }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    dispatch(setSearchTerm(value))
    if (onSearch) {
      onSearch(value)
    }
  }

  const clearSearchInput = () => {
    setSearchValue("")
    dispatch(clearSearch())
    if (onSearch) {
      onSearch("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size={18} />
        <input
          type="text"
          placeholder={placeholder || t("home.search")}
          value={searchValue}
          onChange={handleSearch}
          className={`input-search pl-10 pr-10 border-4 ${border} `}
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearSearchInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar
