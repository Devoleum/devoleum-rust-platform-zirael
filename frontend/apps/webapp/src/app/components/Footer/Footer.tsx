import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div
        className="container text-space"
        style={{
          fontSize: '0.6em',
          wordBreak: 'break-all',
          maxWidth: '90%',
          textAlign: 'center',
          paddingBottom: '1rem !important',
          paddingTop: '1rem !important',
        }}
      >
        <div className="row">
          <div className="col">Copyright &copy; Devoleum</div>
        </div>
        <div className="row">
          <div className="col">Donate to</div>
        </div>
        <div className="row">
          <div className="col">
            ETH: 0xbf8d0d4be61De94EFCCEffbe5D414f911F11cBF8
          </div>
        </div>
        <div className="row">
          <div className="col">
            ALGO: 5N22O3PIXAGNAGHBFSU6HQ22KGI4D3XEBACEFODVH3UOKCA4C2IBRD4ZDE
          </div>
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
