import Link from "next/link"
import { useAccount } from "wagmi"
export const UserPages = () => {
    const {isConnected} = useAccount()
    const userPages = [
        {
            name: "Sales",
            url: "/sales",
            status: "Live",
          },
          {
            name: "Stream",
            url: "/",
            status: "",
          },
          {
            name: "Artist Registration",
            url: "/register",
            status: "",
          }
    ]
    return(
    <>
    <div className="flex flex-row">
              {isConnected && userPages.map((page, i) => (
                <Link key={i} href={`${page.url}`} className="flex ml-2 mr-2">
                  <p className="ml-0 mr-0 text-white/75 cursor-pointer hover:font-light font-bold text-xl">
                    {page.name}
                  </p>
                  {page.status === 'Live' && <div
                    className={` ${
                      page.status === "Live" ? "bg-[#3396FF]/85" : "bg-gray-400"
                    }  ${
                      page.status === "Live" ? "w-[50px]" : "w-[101px]"
                    } text-center   rounded-full h-[19px]`}
                  >
                    <p
                      className={` ${
                        page.status === "Live" ? "text-white" : "text-white"
                      } mt-[2px] py-0 px-1 mr-0 text-xs`}
                    >
                      {page.status}
                    </p>
                  </div>}
                </Link>
              ))}
        </div>
    </>
    )
}

export const ArtistPages = () => {
    const {isConnected} = useAccount()
    const artistPages = [
    {
      name: "Create",
      url: "/create",
      status: "",
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      status: "",
    },
    ]
    return(
    <>
    <div className="flex flex-row">
              {isConnected && artistPages.map((page, i) => (
                <Link key={i} href={`${page.url}`} className="flex ml-2 mr-2">
                  <p className="ml-0 mr-0 text-white/75 cursor-pointer hover:font-light font-bold text-xl">
                    {page.name}
                  </p>
                  {page.status === 'Live' && <div
                    className={` ${
                      page.status === "Live" ? "bg-black/85" : "bg-gray-400"
                    }  ${
                      page.status === "Live" ? "w-[50px]" : "w-[101px]"
                    } text-center   rounded-full h-[19px]`}
                  >
                    <p
                      className={` ${
                        page.status === "Live" ? "text-white" : "text-white"
                      } mt-[2px] py-0 px-1 mr-0 text-xs`}
                    >
                      {page.status}
                    </p>
                  </div>}
                </Link>
              ))}
        </div>
    </>
    )
}


export const AdminPages = () => {
  const {isConnected} = useAccount()
  const adminPages = [
  {
    name: "Admin",
    url: "/admin",
    status: "",
  },
  ]
  return(
  <>
  <div className="flex flex-row">
            {isConnected && adminPages.map((page, i) => (
              <Link key={i} href={`${page.url}`} className="flex ml-2 mr-2">
                <p className="ml-0 mr-0 text-white/75  cursor-pointer hover:font-light font-bold text-xl">
                  {page.name}
                </p>
                {page.status === 'Live' && <div
                  className={` ${
                    page.status === "Live" ? "bg-black/85" : "bg-gray-400"
                  }  ${
                    page.status === "Live" ? "w-[50px]" : "w-[101px]"
                  } text-center   rounded-full h-[19px]`}
                >
                  <p
                    className={` ${
                      page.status === "Live" ? "text-white" : "text-white"
                    } mt-[2px] py-0 px-1 mr-0 text-xs`}
                  >
                    {page.status}
                  </p>
                </div>}
              </Link>
            ))}
      </div>
  </>
  )
}