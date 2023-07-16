import "./Filespage.css";
import file2 from "../assets/file3.txt";
import file4 from "../assets/file4.jpg";

const Filespage = () => {
  const getExtenstion = (file) => {
    const split__array = file.split(".");
    const extension = split__array[split__array.length - 1];
    return extension;
  };

  return (
    <div className="file__container">
      <p className="files__header">Your Files</p>
      <div className="file__list">
        <div className="file__item">
          {getExtenstion(file2) === "jpg" ? (
            <img
              src="https://images.pexels.com/photos/1250643/pexels-photo-1250643.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="source file"
            />
          ) : (
            <div className="img">
              <p>.{getExtenstion(file2)}</p>
            </div>
          )}
          <p>
            Name: <span>File name</span>
          </p>
          <button>Download</button>
        </div>

        <div className="file__item">
          {getExtenstion(file4) === "jpg" ? (
            <img
              src="https://images.pexels.com/photos/1250643/pexels-photo-1250643.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="source file"
            />
          ) : (
            <div className="img">
              <p>.{getExtenstion(file4)}</p>
            </div>
          )}

          <p>file details</p>
          <button>Download</button>
        </div>

        {/* 
        <div className="file__item">
          <img
            src="https://images.pexels.com/photos/1486213/pexels-photo-1486213.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="source file"
          />
          <p>file details</p>
          <button>Download</button>
        </div>

        <div className="file__item">
          <img
            src="https://images.pexels.com/photos/3628700/pexels-photo-3628700.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="source file"
          />
          <p>file details</p>
          <button>Download</button>
        </div>

        <div className="file__item">
          <img
            src="https://images.pexels.com/photos/4006576/pexels-photo-4006576.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="source file"
          />
          <p>file details</p>
          <button>Download</button>
        </div> */}
      </div>
    </div>
  );
};

export default Filespage;
