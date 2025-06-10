import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface Option {
  value: string | null;
  label: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  style,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOptionValue, setHoveredOptionValue] = useState<string | null>(
    null,
  );
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    centerX: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const calculateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        centerX: rect.left + rect.width / 2,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string | null) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !containerRef.current?.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const renderDropdown = () => {
    const portalElement = document.getElementById('portal');
    if (!portalElement || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.centerX,
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          border: '1px solid var(--Gray-200---stroke, #EAECF0)',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
          zIndex: 10000,
          minWidth: 'max-content',
          width: 220,
          maxHeight: 192,
          overflowY: 'auto',
        }}
      >
        {options.map((option, idx, list) => (
          <div
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            onMouseEnter={() => setHoveredOptionValue(option.value)}
            onMouseLeave={() => setHoveredOptionValue(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius:
                idx === list.length - 1
                  ? '0 0 16px 16px'
                  : idx === 0
                  ? '16px 16px 0 0'
                  : '0',
              transition: 'background-color 0.2s',
              backgroundColor:
                hoveredOptionValue === option.value ? '#F5F5FF' : 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontFamily: 'Suisse Intl',
                fontSize: 16,
                fontWeight: 400,
                color: '#101828',
              }}
            >
              {option.label}
            </span>
            {value === option.value && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6654 5L7.4987 14.1667L3.33203 10"
                  stroke="#0B0BCF"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>,
      portalElement,
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      <button
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '11px',
          borderRadius: '30px',
          gap: 6,
          cursor: 'pointer',
          fontSize: '16px',
          color: '#101828',
          outline: 'none',
          position: 'relative',
          height: '100%',
          ...(selectedOption?.value
            ? {
                border: '1px solid #8F8FF3',
                background: '#F5F5FF',
              }
            : { background: 'white', border: '1px solid #D0D5DD' }),
        }}
      >
        <span>
          {selectedOption?.value ? selectedOption.label : placeholder}
        </span>
        <svg
          width="10"
          height="6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke={selectedOption?.value ? '#8e44ad' : '#000000'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {renderDropdown()}
    </div>
  );
};
