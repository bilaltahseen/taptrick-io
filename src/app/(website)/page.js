import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import Carousel from "@/components/Carousel";
import GridContainer from "@/components/GridContainer";

const imageUrls = ["/assets/preview.png",];
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32 flex flex-wrap md:flex-nowrap justify-center items-center">
        <div className="max-w-6xl mb-8 md:mb-0 md:mr-8">
          <h1 className="text-6xl font-bold">Everything in one</h1>
          <h2 className="text-gray-500 text-xl mt-6 mb-4">
            Share your links, social media profiles, contact info and more on
            one page
          </h2>
          <HeroForm user={session?.user} />
        </div>
        <Carousel images={imageUrls} />

       
      </section>
      <div className="mt-20 text-center max-w-5xl">
        <h1 className=" mb-5 text-5xl font-bold">
          You never have to change the link in your bio again
        </h1>
        <p>
        Taptrick was created to solve one of social media’s most frustrating challenges: the limitation of having only one link in your bio. Since then, Taptrick has evolved into so much more, empowering businesses and creators to maximize their social media potential, grow their following, and take control of how their content is discovered.
        </p>
      </div>
      <GridContainer />
    </main>
  );
}
