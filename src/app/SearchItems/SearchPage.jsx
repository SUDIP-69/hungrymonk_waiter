"use client";
import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Image from 'next/image';
import maskvector from "../assets/Mask_group.png";
import LongCard from '../Components/LongCard';
import Orderviewer from '../Components/Orderviewer';
import axios from 'axios';
import LoadingPage from '../Components/LoadingPage';
import { useRouter, useSearchParams } from 'next/navigation';
let restaurant_id;
function SearchPage() {
  const searchParams=useSearchParams();
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [fooditems, setfooditems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id=searchParams.get('id');
  const orderParam = searchParams.get("order");
  const router=useRouter();
  const fetchfoodmenu = async () => {
    try {
      restaurant_id = localStorage.getItem("restaurant_id");
      const res= await axios.post('/api/fetchmenubyrestid', {restaurant_id});
      // setfooditems(data.data.food_items);
      // setFilteredItems(data.data.food_items);
      console.log(res.data)
      if(res.data.success){
        setfooditems(res.data.data.food_items);
        setFilteredItems(res.data.data.food_items);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching food menu:', err);
      setError('Failed to fetch food menu');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchfoodmenu();
  }, []);

  useEffect(() => {
    if (fooditems) {
      const filtered = fooditems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [query, fooditems]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="h-[180px] mb-6 relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
        <Image
          alt="bgbanner"
          src={maskvector}
          priority
          className="absolute top-0 left-0 object-cover"
        />
        <div className="flex justify-between items-center p-6" onClick={()=>router.push('/ViewOrder')}>
          <img
            src="https://www.baksish.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75"
            alt="BakSish"
            priority="true"
          />
        </div>
        <h2 className="text-center mb-2 font-semibold italic text-[#4E0433]">Search your food</h2>
        <div className="search px-10 relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Type 'butter naan'"
            className="pr-8 pl-10 h-10 focus:ring-0 shadow-md bg-[#FFF9EA] w-full rounded-full"
          />
          <SearchIcon className="absolute top-[10px] text-[#4E0433] h-6 left-12" />
        </div>
      </div>
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredItems?.map((item, i) => (
            <LongCard key={i} item={item} />
          ))}
        </div>
      </div>
      <Orderviewer id={id} order={orderParam} restaurant_id={restaurant_id}/>
    </div>
  );
}

export default SearchPage;
