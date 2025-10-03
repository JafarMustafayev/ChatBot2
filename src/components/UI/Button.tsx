interface ButtonProps {
  butonTitle: string;
  icon: string | React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ butonTitle, icon }) => {
  return (
    <button
      className="
    relative 
    mx-2 
    flex 
    items-center 
    justify-center 
    gap-1.5 

    bg-transparent 
    hover:bg-button-hover 
    rounded-md 
    px-3 py-2 
    transition
  "
    >
      {icon}
      <span>{butonTitle}</span>
    </button>
  );
};

export default Button;
