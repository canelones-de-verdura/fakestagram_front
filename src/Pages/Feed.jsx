import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "../Components/postFeed"
import { useNavigate } from "react-router-dom";
//import AuthService from "../Services/AuthService";

const Feed = () => {
    const [imagenes, setImagenes] = useState([]); // Estado para almacenar las imagenes
    const navigate = useNavigate();

    /*
    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('http://localhost:3001/api/feed');
            const data = await response.json();
            setImagenes(data);
        };
    
        fetchImages();
    }, []);
    */

    const handlerProfile = () =>{
        navigate('/profile')
    }
    

    return (
        <>
            
            <div className="feedContainer">
                <div className="feedHeader">
                    <h2>Fakestagram</h2>
                    <div className="iconos" >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS64q_FI3Bo-sHzEo7B-wYSNZmi2cv3ZA89QA&s" alt="heart-icon" className="icon" />
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX+/v4AAAD///+goKDr6+tsbGwlJSXl5eXU1NRwcHD4+Pjn5+ff39/Z2dn19fWEhIRJSUlPT0+kpKSWlpZmZmZ3d3d9fX0vLy/IyMjAwMBfX1+NjY01NTWTk5M/Pz9KSkq0tLQeHh4QEBCrq6sXFxcpKSnDw8MLCws7OztYWFhJvxP3AAAKE0lEQVR4nO1da3uqOBDmjIiISr3U+5Wqrf7/P7hQ11NnQkICCYSevB/2eXaXhnlNmMxMkjee5+Dg4ODg4ODg8ALQiqbZ/ODVpiiKfX/Q6/WGD/S+MfhGj4fv/+s/EaeIosizg+rDgni4Os/e+pPxYRdc/mjA1yW57g7je3/bOYWDqCGa36/1153+8UMHKRFum9nar5lm+rIo7GxMU0N4Pw/rIpm+pnfefNVK74FksYqMk8yGZmfcALsnyXlolGPa+LresZmD3Sw2xTH1mh0tvrIy5kMTHFN++6aZ/WAz0s4RvE7TrDDeB1o5pt/fsmlKDLaRPooQvzdNJw/Jp6ZuTDuwaS489LV0I3jzponwkYTVuxF8yQn+IwmuQZBGzJP75v29208xny9SvP0g+9fFPEP/f3QfeM+Q/XOzuR/HuyCQjuGnVSnCqPAdu+72tBoN4khngpimYb3w87TvH4teP69GEVbC1m+L0zAykba+tjn4nN1FRky8Cq8V+Zhgvo7ryGke7wj3B64l47i0DXyCyVvo1ZmwZSx7+yvHmkNZitwhOlmbz2JYa9I3rjjD9VBuoMIwv7n3UVPFk/S9o/zc5ljGIohz29oYievlrYLRJNcsdavAy/PT11XjZb40xMorMOzVGb7lNPOmMdgtD4i7ObatFU3L9TLNd+ADAOcc63wl48BjWzioNWEUMGSLmGM1hn2mgRLfskFAxLqJjoKBEDJ/3reKYDbK2HljIG0iwM12gpmRDMWNPEPmQ7ZriD4AwEQ4K0krIUrIXx4sJJhR3BE7b5J2AlNWs8iLvgJ8auhJylDwaH4t2/m1g5m1l1KdCCfyZ2+2Ekxt3RJbpSIbIKXRqxWhWj7AI5+izLTPzIXWjtEMjLWjYmtpOCM/yTQCILXORaG5TFo4tJwhtbewokH9TNdugqyzKZwwaCxkeReyk2LRV0Wfv9tOMDV5gU0uCE9oAfGzBQxJxaxgmBLXdK1ST64LgGtTYs8BkKCnty0gSJ3jRdgrtMet9zMZ6IQRChnin2NnZdbEgPh/YTWDBDQWx9yvIBm70P+TqNvqkPQHdIoTjDw6oi3OKhBIxwi8B4nUJy0hSOc4wYxIBnQr5ooMxEEK3AdZrFBdCmgMZLeBwNWQ+lyvNQwjZHfCdzWkPNeGkO0BYjg3RyQ/xa01BD3A623cUgYM0HNGkl8zURJJg7kOhEwWBlxptgPAxC4A4ky5cRtJDs/aN6lC2F1+7foaNqPRlnFpmNs3MJXr67JmeM+o915+jw+naTxdcL8vwPuchVlICSteMtWD5niQRKZHLkNc8dCcHKIFn7nmtmO01sJdKyM+V++KE4DJxr3gtfEdbybHBY8PvR8LcdRy62DSjQNimPA+AkCbZS+aGUo69JKt4/yJYzoA2uHI/SFK2tAxyhDvZOZ8A+ChDQqB3rCUMJxpZogripxdGeAt28sQF6M4WRHZoWCWofpOO3Hr+EQIZ6KD6PJbGHKSC4jRtsar3ujRDoboqaBVDKUSRBLc/X6GZkepbl+KGXKShn+AIS5i/EaGvRoZ6o7a8JKSDQx196F9DJvpQ7wAbHa2+P0MmxmljmE1G2xgiIuOjqGqDY5htdYdw8dTjmE1G2xkqNcGvLDVDENcd3cMVW3ADJuJS10fVrOh9X1YKFdCGRZB7e1yVYwKDDNJh3NHhCle/zpMhU+fV2r7UowzBPbMYmXsVVYVTDOEnLPf1aEiWWKcoRkxN4XDuYYZkv1w+iC/2G+aIXaT+iC/SVmSYdm4FIwJ1kk7G9MMcyVjdEDa15hmaErU9CLtauQ2O5VnaEoXU0EGwjBDU75U/kSLYYbsEX49UDhkbZqhmXE6UdiUZZyhByuqwlEZHZXQ2zzDNDQdngTpwnQ6TVDru/S/CHKLk6KqdQ0MixNEHPhMjeaHZhgW2WA2x5djaHbtyTGs1roNDM2ucjuGj6ccw2o2OIbVWncMH085htVssIEh3tf2+xm2a+eeY/h4yjGsZoNjWK11x/DxlGNYzQb7GLZrxsfLX/8uQ3xm5jcyrPPsmg0M2+VpMEPeaXXSh0ZPyTbDkJwhbRVDtAx94axa0ZPOrVIcQFsJeGIJEKELlRLNqhE1airwJMiJpoJuXQysdjfVzBAtX/K0TYguhm6BFbyypVfAiGibcG+4AnyziWZBOkDfgOaPHOvTcLXnyb4Y3SpKrzpbmnXEiMYQd7cYkZDUrQP9ospY8qI0ftN4KpdVwtIrA5R9LLPnb2xY64srfkkWMTXLHmQU/e1xudusTeu1cQ8CEEW6vm47/u5m0N8u3rLE1dIjfW1GgtZMo1g3kbtbjFEcNmGMEZAiBldpDgDfZmbpFUE5kJP68mj82haxa49ujhRktmRC1Bw7moOCjjCeLgw4UzMgUb1ICxpPK8vWMMRjTyC8SjXZ2+JqcFAvvBGJPNoSQW86y4nmXNLdxZcnWQHyGQrv7SLRz7Idit6k0CbMzEhhv513lIincRIctOLuAHq/kTg1I3cHtGKYktJEwRVV9M5EzZUME6CetECGnN5Bav21a6nJM8yw6M5cetue9ZM+eLhPuFref/+ADFPrrwuiV/sWauWDh8Ma+SOAzQDgomovKbjZHtfQE7oSjoO5ZNfqWZ+5wlLG+dNTvWObryajQgA7GVuZ61ktTvVpOCNZxSb65haPU/Bx6Ux2dwV8Eoa2xm7AHCKXvVaFrLJloZ6VFGl0In+bIfMlplOGhRTZo7nyNQlWJGFvH0UazChdfEv2f1lJkSWotGhN4/U/WfHUJoqQY6GauBawR7O1L2tWAJClmAyKl6jRS2UzfKws6UaAHp2yFcfodyt5mjNvVlzbCTmfYIk1ecgVnQma70aAwT3HshJ5LNkh9cRd/6VpSlZBtM0za1LGKiaNejamKHegD+l7Y9aFZriViyvJqtwPDqe4fpLZDofRIt+goKybpzWbH3x1P2Mjmyp4lqQYdHIc6DeSovKaoGEuxRSb6dDQ3hFsQ4Z4tT1wDblWqQeyMTjGfX8axjKKHbK/BCsAEofnOZ/dHzVpvrw39hIxxxSX+3x/XoejgR9HxRKYxZImURz7g164Wp+3/WIVscqZHcQKUmWXJLgG19th/MThcFsug1csl8vb4fB44jj5i++Hb+mj1yBILh/Fr3piW/0rAcidgCyBli1yIPQ3jWKia80BPFousANTfX4cIOTNRc2hq/sW0fWy+KU1Yqw9Pk79+Mkejjf9m3AfHFemJCDVsDGXwwH4M2F8UQOCbc9ooJh25HCfmzjWQ2+hqIJdkiP0zpuvYnN047APo5rymYxkFHbq/Cg3s1Wt6dr/LMH/7HQNT5TL+2K68mvI0gQ0PT9cd7bz+zGNnJPLpdrwvVySNDIfH+/9t9l0HfpRHSmoFM1n4hOlqU+a/LxiMBj4kojjtAHUZNOVPYzKqaGdtBwcHBwcHBwcbMB/F0iVxVvHdrYAAAAASUVORK5CYII=" alt="plus-icon" className="icon" />
                    </div>
                </div>
                <div className="postContainer">
                    <Post nomUsuario="User" profileImg="https://images.unsplash.com/photo-1632932197818-6b131c21a961?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    img="https://s3-alpha-sig.figma.com/img/2a1e/79b4/d4d7dd5ed1da7361cee9f33fa2750926?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AyOj28pIPibPW077E2XlvfpN1puPW6ObFD-k1PVej9bbCk0gnMzw66JAHo4vSbEK4rebK8~DxUBZonNNB~QQDpGXIUgpwSOBaFXAWN5HKRYjF4dISin7OUgPzX533b4155dTeBxRy~D3AQ9wYcYF1iegMyA80aHHbi1HytCBraSv0NA86B4zsHZzAdJNTOZy-PU3sETa2rDZr7vgrsY5uUkFpaAur4d5Ra4-iaTWXFeuRfRLx2L~X-VxMNWNdEml8BU8ALAr030fsp7EHGVFR7N-zxw6LZsMHoYsRMm6wVr9p7VytJEa7iaLmMQPuYppDJ3E-tCdJ4CfFS7Rzbz5Uw__" description="foto blaco y negro"/>
                    <Post nomUsuario="User" profileImg="https://images.unsplash.com/photo-1632932197818-6b131c21a961?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    img="https://s3-alpha-sig.figma.com/img/2a1e/79b4/d4d7dd5ed1da7361cee9f33fa2750926?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AyOj28pIPibPW077E2XlvfpN1puPW6ObFD-k1PVej9bbCk0gnMzw66JAHo4vSbEK4rebK8~DxUBZonNNB~QQDpGXIUgpwSOBaFXAWN5HKRYjF4dISin7OUgPzX533b4155dTeBxRy~D3AQ9wYcYF1iegMyA80aHHbi1HytCBraSv0NA86B4zsHZzAdJNTOZy-PU3sETa2rDZr7vgrsY5uUkFpaAur4d5Ra4-iaTWXFeuRfRLx2L~X-VxMNWNdEml8BU8ALAr030fsp7EHGVFR7N-zxw6LZsMHoYsRMm6wVr9p7VytJEa7iaLmMQPuYppDJ3E-tCdJ4CfFS7Rzbz5Uw__" description="foto blaco y negro"/>
                    <Post nomUsuario="User" profileImg="https://images.unsplash.com/photo-1632932197818-6b131c21a961?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    img="https://s3-alpha-sig.figma.com/img/2a1e/79b4/d4d7dd5ed1da7361cee9f33fa2750926?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AyOj28pIPibPW077E2XlvfpN1puPW6ObFD-k1PVej9bbCk0gnMzw66JAHo4vSbEK4rebK8~DxUBZonNNB~QQDpGXIUgpwSOBaFXAWN5HKRYjF4dISin7OUgPzX533b4155dTeBxRy~D3AQ9wYcYF1iegMyA80aHHbi1HytCBraSv0NA86B4zsHZzAdJNTOZy-PU3sETa2rDZr7vgrsY5uUkFpaAur4d5Ra4-iaTWXFeuRfRLx2L~X-VxMNWNdEml8BU8ALAr030fsp7EHGVFR7N-zxw6LZsMHoYsRMm6wVr9p7VytJEa7iaLmMQPuYppDJ3E-tCdJ4CfFS7Rzbz5Uw__" description="foto blaco y negro"/>
                </div>
                <div className="navContainer">  
                    <button className="buttonNav"><img className="imgNav" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsowOow7PxuzfIcWJNxexTnvsRg8BhECpDg&s"/></button>
                    <button onClick={handlerProfile} className="buttonNav"><img className="imgNav" src="https://images.unsplash.com/photo-1632932197818-6b131c21a961?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></button>
                </div>
            </div>
        </>
    )
}

export default Feed;