import React from 'react';
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    missing: 'Achievement missing',
  },
  it: {
    missing: 'Achievement da conquistare!',
  },
});

export interface IProps {
  label: string;
  text: string | null;
  img: string;
  img_off: string;
  link?: boolean;
  verifyLink?: string;
}

const Achievement = ({
  label,
  text = '',
  img,
  img_off,
  link = true,
  verifyLink,
}: IProps) => {
  console.log('args: ', label, text, img, img_off, link, verifyLink);
  if (!text) return null;
  return (
    <div className="row" style={{ marginBottom: '15px' }}>
      <div className="col col-md-auto">
        {text ? (
          <img src={img} style={{ width: '64px' }} />
        ) : (
          <img src={img_off} style={{ width: '64px' }} />
        )}
      </div>
      <div className="col col-side">
        <strong
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {label}
        </strong>
        <div>
          {text ? (
            <>
              {link ? (
                <div>
                  <a href={text} target="_blank">
                    Link
                  </a>
                  <br />
                  {verifyLink && (
                    <a href={verifyLink} target="_blank">
                      Verify
                    </a>
                  )}
                </div>
              ) : (
                <p
                  style={{
                    wordBreak: 'break-word',
                    marginTop: 0,
                  }}
                >
                  {text}
                </p>
              )}
            </>
          ) : (
            <div>{strings.missing}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievement;
