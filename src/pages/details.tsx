import Link from 'next/link';
import { NextPage } from 'next';

export interface VehiclePerson {
  ownerName: string;
  vehicle: string;
  details: string;
}

interface PropsItf {
  list?: VehiclePerson[];
}

const Details: NextPage<PropsItf> = ({ list }) => {
  return (
    <div>
      {list?.map(
        (
          el: { ownerName: string; vehicle: string },
          index: number,
        ): React.ReactNode => (
          <div key={index}>
            <Link
              as={`/${el.vehicle}/${el.ownerName}`}
              href="/[vehicle]/[person]"
            >
              <a>Navigate to {el.ownerName}</a>
            </Link>
          </div>
        ),
      )}
    </div>
  );
};

Details.getInitialProps = async () => {
  const resp = await fetch('http://localhost:4001/vehicles');
  const list: VehiclePerson[] | undefined = await resp.json();
  return { list };
};

export default Details;
