import { useState } from "react";
import PhotoScroll from "./PhotoScroll";
import SearchInput from "./SearchInput";

function App() {

  const [data, setData] = useState<{imageData:string[]}>({imageData:[]})

  const setImageData = (data:string[]) => {
    setData({imageData:data})
  }

  return (
    <div className="App w-screen h-screen flex flex-col items-center overflow-hidden">
      <h1 className="text-center py-4 text-2xl font-bold">React Photo Scroll</h1>
      <SearchInput setImageData={setImageData}></SearchInput>
      <PhotoScroll imageData={data.imageData}></PhotoScroll>
    </div>
  )
}

export default App
