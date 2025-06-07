import { useAppstore } from "../../store/store";
import {ListingCard} from "../ListingCard";
export default function ListView() {
    const { listings } = useAppstore()
    return (
        <div className="grid grid-cols-5 px-20 gap-10 py-10 justify-start items-start">
            {
                listings?.map((listing, i) => (
                    <div key={listing.id}>
                        <ListingCard key={listing.id} data={listing} />
                    </div>
                ))
            }
        </div>
    )
}