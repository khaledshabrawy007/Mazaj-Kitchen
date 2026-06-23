function KpiCard({ title, value, icon, color = 'orange' }) {
  const gradients = {
    orange: 'from-orange-500 to-amber-500 text-orange-600 bg-orange-50 border-orange-100',
    dark: 'from-gray-800 to-gray-950 text-gray-700 bg-gray-50 border-gray-100',
    yellow: 'from-yellow-500 to-amber-400 text-yellow-600 bg-yellow-50 border-yellow-100',
    green: 'from-green-500 to-emerald-500 text-green-600 bg-green-50 border-green-100',
  };

  const selectedGrad = gradients[color] || gradients.orange;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 truncate">
          {title}
        </p>
        <h4 className="text-2xl font-black text-gray-900 leading-none">
          {value}
        </h4>
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${selectedGrad}`}>
        {icon}
      </div>
    </div>
  );
}

export default KpiCard;
