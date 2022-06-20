import { useEffect, useState } from "react";

function App() {
  const [crytoList, setCryptoList] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCryptoList(data);
      });
  }, []);

  console.log(crytoList);

  if (crytoList.length > 0) {
    return (
      <body className="container mx-auto my-20">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        Market Cap
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        Volume (24h)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-md text-justify font-medium text-zinc-700 uppercase tracking-wider"
                      >
                        24h %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crytoList.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.market_cap_rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-7 w-7">
                              <img
                                className="rounded-full"
                                src={item.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium">
                                {item.name}
                                <span className="text-sm text-gray-400">
                                  ({item.symbol.toUpperCase()})
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          {item.current_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          {item.market_cap.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          {item.total_volume.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          {item.price_change_percentage_24h < 0 ? (
                            <p className="flex text-red-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 pt-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              {item.price_change_percentage_24h}%
                            </p>
                          ) : (
                            <p className="flex text-green-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 pt-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              {item.price_change_percentage_24h}%
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
