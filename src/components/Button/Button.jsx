import React from 'react';

const PrimaryButton = ({
  text,
  onClick,
  disabled = false,
  shine = false,
  className = '',
  testId = 'primary-button',
  type = 'button',
}) => {
  const baseClass =
    'inline-flex items-center justify-center whitespace-nowrap text-18 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 primary-button disabled:primary-button-disabled box-shadow text-primary-foreground hover:bg-primary/90 font-bold rounded-6 py-12 px-48 w-full uppercase';

  const shineClass = shine && !disabled ? ' shine-animation' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={`${baseClass}${shineClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
