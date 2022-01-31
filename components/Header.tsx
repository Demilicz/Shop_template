export const Header = () => {
  return (
    <div className="header-bar">
      <h1 className="title">Shop</h1>
      <style jsx>
        {`
          .header-bar {
            display: flex;
            background: #84a8b5;
            margin-bottom: 20px;
          }
          .title {
            font-size: 38px;
            margin: 20px 26px;
            color: black;
            font-weight: 600;
          }
        `}
      </style>
    </div>
  )
}


