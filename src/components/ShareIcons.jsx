import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const Whatsapp = () => {
  return (
    <div>
      <WhatsappShareButton className="shareButton" url={window.location.href}>
        <WhatsappIcon className="shareIcon" />
      </WhatsappShareButton>
    </div>
  );
};

const Facebook = () => {
  return (
    <div>
      <FacebookShareButton className="shareButton" url={window.location.href}>
        <FacebookIcon className="shareIcon" />
      </FacebookShareButton>
    </div>
  );
};

const Twitter = () => {
  return (
    <div>
      <TwitterShareButton className="shareButton" url={window.location.href}>
        <TwitterIcon className="shareIcon" />
      </TwitterShareButton>
    </div>
  );
};

export const ShareIcons = () => {
  return (
    <div>
      <Facebook />
      <Twitter />
      <Whatsapp />
    </div>
  );
};
