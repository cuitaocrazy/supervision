import {FC} from 'react'
interface cardListProps{
  className?:string,
  cardName?:string,
  bankName?:string,
  balanceAmt?:string
}


const cardListCard:FC<cardListProps>=(props)=>{
  return (
    <div className={props.className}>
      <img className="absolute bottom-0 z-10 left-32" width='100px' height='px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAB+CAYAAAD7od5CAAABWWlDQ1BEaXNwbGF5IFAzAAAokZ2OPyiEYRzHP88dvXUocm4wPeVPBsQZzmJwlIg6Mtyd6b33/qlznt57i5vUWYxKBmVisDJeBgaDZCCRQWQ1upJCj+HoXAbls3y/ffrW7weudlOpTA2wkHXsmbGgDEei0njEwKABH9K0cmo4FJoE+M5qXm4QAFc9plKZs9bNQsdK49TgVvP15VNL4fe+Ck88kbOAdyBhKdsBEQfalhzlgFgDvHY4EgWxDXhT5b4PeGPlfgJ47dmZERC3gLTSZhzEK9Ad++FTP/rXXYC60fmcyph5GRr449t/4CSWHYCRRZW351NpRw4rlUnI8azV2y39ff0BCEeisrwuTSMA4TuvuNUHGDrSWh9W3MQRHATAU6y4rkFoqoPTojJtEwA34Eom4XkPGiLQfAGeuVxywA+AqA9C7b3WpU4wNuBjXeu3Ha0/dsF9B8fZTxUhZe6KC5V+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA4LTIzVDE3OjE3OjE2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA4LTIzVDE3OjE3OjE2KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOC0yM1QxNzoxNzoxNiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiY2E1NjA0Yy0xNzZjLTQ4ZTItYmE4Mi1mMTk0MDZiOTY0MGUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5YTQxNWFlYi0xNTZiLWIxNDAtOWI4Zi01MGVmZWRmMTAzNGYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NTgzMzUyMy1iMzBmLTRjNDktYTRiNy01NTE3MzRiN2ZiNDQiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iRGlzcGxheSBQMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODU4MzM1MjMtYjMwZi00YzQ5LWE0YjctNTUxNzM0YjdmYjQ0IiBzdEV2dDp3aGVuPSIyMDIyLTA4LTIzVDE3OjE3OjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmNhNTYwNGMtMTc2Yy00OGUyLWJhODItZjE5NDA2Yjk2NDBlIiBzdEV2dDp3aGVuPSIyMDIyLTA4LTIzVDE3OjE3OjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9i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'></img>
        <div className="relative z-20 mx-2 my-4">
          <img
            className="rounded-full w-14 h-14"
            src="http://placekitten.com/g/200/300"
          ></img>
        </div>
        <div className="my-5">
          <div className="font-bold">时尚造型会员卡</div>
          <div className="text-sm">中国银行</div>
        </div>
        <div className="flex items-center font-bold pl-14">
          <div className="flex justify-self-end">
            <span>余额：</span>
            <span>11111.99</span>
          </div>
        </div>
      </div>
  )
}

export default cardListCard
