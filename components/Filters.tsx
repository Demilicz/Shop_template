export const Filters = () => {
  return (
    <div className="container">
      <div className="brand-container">
        <p>Choose brand your</p>
        <div className="brand-filter">
          <div>
            <input type="checkbox"/>
            <label >Apple</label>
          </div>
          <div>
            <input type="checkbox"/>
            <label >Xiaomi</label>
          </div>
          <div>
            <input type="checkbox"/>
            <label >Samsung</label>
          </div>
        </div>
      </div>



        <style jsx>{`
        .container {
          width: 350px;
        }
        .brand-container {
          margin-left: 15px;
        }
        .brand-filter{
          display: flex;
          flex-direction: column;
        }
    `}</style>
    </div>

  )
}