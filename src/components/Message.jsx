import greenUrl from "../images/triangle_green.svg";
import whiteUrl from "../images/triangle.svg";

function Message({ message }) {
  return (
    <>
      {message.type === "outgoing" ? (
        <div className="flex mt-1 self-end max-w-[75%] drop-shadow-md last:mb-16">
          <div className="min-h-8 w-fit p-2 bg-[#E0FCD7] rounded-md translate-x-1 translate-y-0.5">
            <p className="text-xs min-h-3 leading-4">{message.textMessage}</p>
          </div>
          <span className="text-{0}">
            <img src={greenUrl}></img>
          </span>
        </div>
      ) : (
        <div className="flex mt-1 self-start max-w-[75%] drop-shadow-md last:mb-16">
          <span className="text-{0}">
            <img src={whiteUrl}></img>
          </span>
          <div className="min-h-8 w-fit p-2 bg-white rounded-md -translate-x-1 translate-y-0.5">
            <p className="text-xs min-h-3 leading-4">{message.textMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
