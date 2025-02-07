import { useParams } from "react-router-dom";
import useGetPageDetails from "../hooks/page/useGetPageDetails";
import { usePageDetailsContext } from "../context/PageDetailsContext";
import Icon from "../components/page/Icon";
import Title from "../components/page/Title";
import Editor from "../components/page/Editor";
import Breadcrumb from "../components/page/Breadcrumb";

const Page = () => {
  const { id } = useParams();
  const { loading } = useGetPageDetails(id);
  const { page } = usePageDetailsContext();

  return (
    <div>
      {loading && (
        <div className="flex flex-col justify-center items-center">
          <span className="light-loader text-center"></span>
        </div>
      )}
      {!loading && page && (
        <div>
          <Breadcrumb pageId={page.id}/>
          <div className="py-5 sm:py-24">
            <div className="px-10 sm:px-20">
              <Icon id={page.id} icon={page.icon} />
              <Title id={page.id} title={page.title} />
            </div>
            <div className="sm:px-7">
              <Editor id={page.id} content={page.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
