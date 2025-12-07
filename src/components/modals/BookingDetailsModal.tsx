
type BookingHistory = {
  key: number;
  date: string; 
  pickupCity: string;
  dropOffCity: string;
  distance: number; 
  className: string;
  classImage: string; 
  categoryName: string;
  price: number; 
  totalAdults: number;
  totalKids: number;
  status: 'Completed' | 'Canceled' | 'Active' | string; 
}; 

const BookingDetailsModal = ({showDetails}:{showDetails:BookingHistory|null}) => {
    return (
        <div className=" p-6 rounded-lg  mx-auto">
            {/* Header with Logo */}
            <div className="flex justify-center gap-4 mb-4">
                <img src={showDetails?.classImage} alt="Lay's Logo" className="h-[200px]" />

                {/* Adjust the logo path accordingly */}
            </div>

            {/* Content Grid */}
            <div className="flex gap-5 justify-between my-4">
                {/* Brand's Details Section */}
                <div className="space-y-3 w-[100%]">
                   
                    <p className="flex justify-between">
                        <span className="font-medium">category Name:</span>
                        <span>{showDetails?.categoryName}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Class Name:</span>
                        <span>{showDetails?.className}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Pick Up City:</span>
                        <span>{showDetails?.pickupCity}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Drop-off City:</span>
                        <span>{showDetails?.dropOffCity}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Distance(KM):</span>
                        <span>{showDetails?.distance}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Price:</span>
                        <span>{showDetails?.price}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Total Adult:</span>
                        <span>{showDetails?.totalAdults}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Total Kids:</span>
                        <span>{showDetails?.totalKids}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span>{showDetails?.status}</span>
                    </p>
  
                </div>

            </div>
        </div>
    );
};

export default BookingDetailsModal;
