
import { SyntheticEvent, useRef } from "react";
import axios from 'axios'

const API_KEY = "YOUR_API_KEY";

const SearchInput = (props:{setImageData:(data:string[]) => void}) => {

  const timeout = useRef(0);

  const changeHandler = (e:SyntheticEvent) => {

    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {

      const el = e.target as HTMLInputElement;
      if (el.value.length > 0) {

        const res = await axios.get('https://pixabay.com/api/', 
        { 
          params: { 
            key: API_KEY,
            q: encodeURIComponent(el.value),
            image_type: 'photo',
            per_page: 100,
            orientation: 'vertical'
          } 
        });
        props.setImageData(res.data.hits.map((it:any) => it.webformatURL));
      }
    }, 600);
  }

  return (
    <input className="rounded-lg block my-2 py-1 bg-white w-64 text-lg text-center text-black" type="text" onChange={changeHandler} />
  )
}

export default SearchInput
