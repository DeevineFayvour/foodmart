export const Navigation = () => {
  return (
    <nav>
      <ul className="flex justify-around p-3 mx-auto mb-10 text-xs md:w-3/5 lg:1-2 md:gap-6 bg-base-300 md:text-sm rounded-xl md:p-4">
        <li className="hover:text-orange-500">
          <a href="#SMOOTHIE">SMOOTHIE</a>
        </li>
        <li className="hover:text-orange-500">
          <a href="#SALAD">SALAD</a>
        </li>
        <li className="hover:text-orange-500">
          <a href="#MAIN DISH">MAIN DISH</a>
        </li>
      </ul>
    </nav>
  );
};
