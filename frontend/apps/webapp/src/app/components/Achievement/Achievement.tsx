import React from 'react';
import LocalizedStrings from 'react-localization';
import { Row, Col, Image } from 'react-bootstrap';

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
      <div className="col">
        {text ? (
          <Image src={img} style={{ width: '64px' }} />
        ) : (
          <Image src={img_off} style={{ width: '64px' }} />
        )}
      </div>
      <div className="col">
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
