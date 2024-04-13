import './DropDownMenu.scss';

export default function DropDownMenu({ items, onSelect, setIsOpen }) {
  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <ul className="dropdown-menu__list">
        {items.map((item) => (
          <li key={item.id} className="dropdown-menu__item">
            <button
              className="dropdown-menu__button"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
