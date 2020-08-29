import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface prop {
  ownerName: string;
  vehicle: string;
  details: string;
}

type props = { list: prop[] };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Person: NextPage<props> = ({ list: initList }) => {
  // const [list, setList] = useState<prop[]>(initList);
  const { query } = useRouter();
  // useEffect(() => {
  //   fetch(
  //     'http://localhost:4001/vehicles?ownerName=' +
  //       query.person +
  //       '&vehicle=' +
  //       query.vehicle,
  //   )
  //     .then((resp) => resp.json())
  //     .then((l) => setList(l));
  // }, []);
  const { data } = useSWR(
    'http://localhost:4001/vehicles?ownerName=' +
      query.person +
      '&vehicle=' +
      query.vehicle,
    fetcher,
  );
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

Person.getInitialProps = async (ctx: NextPageContext) => {
  if (!ctx.req) return { list: [] };
  const { person, vehicle } = ctx.query;
  const resp = await fetch(
    'http://localhost:4001/vehicles?ownerName=' +
      person +
      '&vehicle=' +
      vehicle,
  );
  const list: prop[] = await resp.json();
  return { list };
};

export default Person;
