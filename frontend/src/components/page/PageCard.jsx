import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  return (
    <Link to={"/page/" + page.id} className="bg-[#202020] rounded-md border border-transparent hover:border-white/10 duration-200">
      <div className="bg-neutral-800 w-full h-10 rounded-t-lg"></div>
      <div className="px-5 pb-3">
        <p className="-mt-3">{page.icon ? page.icon : <span>📄</span>}</p>
        <p className="text-sm mt-2">{page.title}</p>

        <p className="text-sm opacity-50">{formatDistanceToNow(new Date(page.updatedAt), {addSuffix: true})}</p>
      </div>
    </Link>
  );
};

export default PageCard;
