// components/Banner.jsx
function Banner({ title, subtitle, imageUrl }) {
  return (
    <div
      className="bg-cover bg-center h-64 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-4 rounded-lg">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

export default Banner;
