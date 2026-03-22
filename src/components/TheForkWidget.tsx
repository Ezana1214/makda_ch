const TheForkWidget = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://widget.thefork.com/c210f176-61da-4d21-acdb-fc90eeae5a6c', '_blank', 'noopener');
  };

  return (
    <div className="tf-widget-button">
      <a
        className="tf-button-link"
        href="https://widget.thefork.com/c210f176-61da-4d21-acdb-fc90eeae5a6c"
        target="_blank"
        rel="noopener"
        onClick={handleClick}
      >
        Réserver une table
      </a>
      <style>
        {`
          .tf-widget-button {
            opacity: 1;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border: 1px solid;
            z-index: 9999999;
            background-color: #fff;
            border-radius: 4px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 42px;
            width: 220px;
            border-color: hsl(174, 100%, 20%);
            color: hsl(174, 100%, 20%);
          }
          .tf-button-link {
            text-decoration: none;
            color: hsl(174, 100%, 20%);
            font-family: Raleway, sans-serif;
            font-size: 1.1em;
            width: 100%;
            text-align: center;
          }
          .tf-button-link:hover {
            font-weight: 700;
            background: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default TheForkWidget;
