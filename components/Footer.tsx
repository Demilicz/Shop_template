export const Footer = () => {
  return (
    <div className="container">
         <footer className="footer">copyright © 2021 . all rights reserved.</footer>
         <style jsx>
          { `
            .container{
              display: flex;
              background: #84a8b5;
              margin-top: 20px;
              justify-content: center;
              align-items: center;
            }
            .footer {
              font-size: 16px;
              margin: 20px 26px;
            }
          `}
        </style>
    </div>
  )
}



