import React, { useState } from 'react'
import './Dropdown.css'

type DropdownProps = {
  menu: string[]
}

export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  const renderMenuItems = () => {
    return props.menu.map((item, index) => (
      <li key={index} className="dropdown-item" onClick={() => handleMenuItemClick(item)}>
        {item}
      </li>
    ))
  }

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem || 'Data Sources'}
        <span className='dropdown-arrow'>&#9660;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {renderMenuItems()}
        </ul>
      )}
    </div>
  )
}