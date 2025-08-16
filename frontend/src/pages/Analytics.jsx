import React from 'react';
import img1 from '../assets/img1.jpg';


const Analytics = () => {
  return (
    
       <section className="w-max mx-auto py-20 px-4 sm:px-6 lg:px-8 flex justify-between">
       <div className="w-80 h-80 flex items-center justify-center bg-gray-300">
  <img src={img1} alt="stocks" className="max-w-full max-h-full" />
</div>

      <div>  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800">Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">$1,200</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800">Sales</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800">Customers</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">200</p>
          </div>
        </div>
       </div>
    </section>
   
  )
}

export default Analytics
