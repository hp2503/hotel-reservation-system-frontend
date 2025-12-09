export interface Room {
  _id: string;
  roomNumber: number;
  floor: number;
  position: number;
  isBooked: boolean;
  bookingId?: string;
  bookedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id: string;
  bookingReference: string;
  roomNumbers: number[];
  roomIds: string[];
  numberOfRooms: number;
  totalTravelTime: number;
  floors: number[];
  status: 'active' | 'cancelled' | 'completed';
  metadata?: {
    horizontalDistance: number;
    verticalDistance: number;
    bookingStrategy: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface OccupancySummary {
  overall: {
    totalRooms: number;
    bookedRooms: number;
    availableRooms: number;
    occupancyRate: number;
  };
  floorWise: FloorOccupancy[];
}

export interface FloorOccupancy {
  floor: number;
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
  occupancyRate: number;
}

export interface BookingStats {
  bookings: {
    total: number;
    active: number;
    cancelled: number;
  };
  rooms: {
    total: number;
    booked: number;
    available: number;
    occupancyRate: number;
  };
}