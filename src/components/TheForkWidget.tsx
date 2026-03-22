const TheForkWidget = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://www.facebook.com/profile.php?id=61561990207554', '_blank', 'noopener');
  };

  return (
    <div className="tf-widget-button">
      <a
        className="tf-button-link"
        href="https://www.facebook.com/profile.php?id=61561990207554"
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
            border: 1px solid #5A2B20;
            z-index: 9999999;
            background-color: #5A2B20;
            border-radius: 9999px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: 48px;
            width: 220px;
            transition: all 0.3s ease;
          }
          .tf-widget-button:hover {
            background-color: #401400;
            border-color: #401400;
          }
          .tf-button-link {
            text-decoration: none;
            color: #ffffff;
            font-family: inherit;
            font-size: 1em;
            font-weight: 100;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tf-button-link:hover {
            font-weight: 300;
            background: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default TheForkWidget;
