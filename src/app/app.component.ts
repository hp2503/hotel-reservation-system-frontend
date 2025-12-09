import { Component, OnInit } from '@angular/core';
import { BookingService } from './services/booking.service';
import { RoomService } from './services/room.service';
import { Room, Booking, OccupancySummary } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hotel Room Reservation System';
  
  rooms: Room[] = [];
  bookings: Booking[] = [];
  occupancySummary: OccupancySummary | null = null;
  
  numberOfRooms: number = 1;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';
  
  selectedBooking: Booking | null = null;
  showBookingDetails: boolean = false;

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    this.loading = true;
    try {
      // Initialize rooms if not already done
      await this.roomService.initializeRooms().toPromise();
      
      // Load initial data
      await Promise.all([
        this.loadRooms(),
        this.loadBookings(),
        this.loadOccupancySummary()
      ]);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  async loadRooms(): Promise<void> {
    try {
      const response = await this.roomService.getAllRooms().toPromise();
      this.rooms = response?.data?.rooms || [];
    } catch (error) {
      console.error('Error loading rooms:', error);
    }
  }

  async loadBookings(): Promise<void> {
    try {
      const response = await this.bookingService.getAllBookings().toPromise();
      this.bookings = response?.data?.bookings || [];
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  }

  async loadOccupancySummary(): Promise<void> {
    try {
      const response = await this.roomService.getOccupancySummary().toPromise();
      this.occupancySummary = response?.data || null;
    } catch (error) {
      console.error('Error loading occupancy summary:', error);
    }
  }

  async createBooking(): Promise<void> {
    if (this.numberOfRooms < 1 || this.numberOfRooms > 5) {
      this.showError('Please enter a number between 1 and 5');
      return;
    }

    this.loading = true;
    this.clearMessages();

    try {
      const response = await this.bookingService.createBooking(this.numberOfRooms).toPromise();
      this.showSuccess(`Booking created successfully! Reference: ${response?.data?.booking?.bookingReference}`);
      
      await Promise.all([
        this.loadRooms(),
        this.loadBookings(),
        this.loadOccupancySummary()
      ]);
      
      this.numberOfRooms = 1;
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  async generateRandomOccupancy(): Promise<void> {
    this.loading = true;
    this.clearMessages();

    try {
      const percentage = Math.floor(Math.random() * 50) + 30; // 30-80%
      const response = await this.bookingService.generateRandomOccupancy(percentage).toPromise();
      this.showSuccess(`Random occupancy generated: ${response?.data?.roomsBooked} rooms booked`);
      
      await Promise.all([
        this.loadRooms(),
        this.loadBookings(),
        this.loadOccupancySummary()
      ]);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  async resetBookings(): Promise<void> {
    if (!confirm('Are you sure you want to reset all bookings?')) {
      return;
    }

    this.loading = true;
    this.clearMessages();

    try {
      await this.bookingService.resetBookings().toPromise();
      this.showSuccess('All bookings have been reset');
      
      await Promise.all([
        this.loadRooms(),
        this.loadBookings(),
        this.loadOccupancySummary()
      ]);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  viewBookingDetails(booking: Booking): void {
    this.selectedBooking = booking;
    this.showBookingDetails = true;
  }

  closeBookingDetails(): void {
    this.showBookingDetails = false;
    this.selectedBooking = null;
  }

  getRoomsByFloor(floor: number): Room[] {
    return this.rooms.filter(room => room.floor === floor);
  }

  getFreeRoomsByFloor(floor: number): Room[] {
    return this.rooms.filter(room => room.floor === floor && !room.isBooked);
  }

  getRoomStatus(room: Room): string {
    return room.isBooked ? 'booked' : 'available';
  }

  private showError(message: string): void {
    this.error = message;
    setTimeout(() => this.error = '', 5000);
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 5000);
  }

  private clearMessages(): void {
    this.error = '';
    this.successMessage = '';
  }

  private handleError(error: any): void {
    const message = error?.error?.error || error?.message || 'An error occurred';
    this.showError(message);
  }
}