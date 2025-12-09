import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse, Booking, BookingStats } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  /**
   * Create a new booking
   */
  createBooking(numberOfRooms: number): Observable<ApiResponse<{ booking: Booking; message: string }>> {
    return this.http.post<ApiResponse<{ booking: Booking; message: string }>>(
      this.apiUrl,
      { numberOfRooms }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get all bookings
   */
  getAllBookings(status?: string): Observable<ApiResponse<{ count: number; bookings: Booking[] }>> {
    return this.http.get<ApiResponse<{ count: number; bookings: Booking[] }>>(
      `${this.apiUrl}/${status ? status : ''}`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get booking by reference
   */
  getBookingByReference(reference: string): Observable<ApiResponse<{ booking: Booking }>> {
    return this.http.get<ApiResponse<{ booking: Booking }>>(
      `${this.apiUrl}/${reference}`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Cancel a booking
   */
  cancelBooking(reference: string): Observable<ApiResponse<{ message: string; booking: Booking }>> {
    return this.http.delete<ApiResponse<{ message: string; booking: Booking }>>(
      `${this.apiUrl}/${reference}`
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Generate random occupancy
   */
  generateRandomOccupancy(percentage: number): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/random-occupancy`,
      { percentage }
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Reset all bookings
   */
  resetBookings(): Observable<ApiResponse<{ message: string }>> {
    return this.http.post<ApiResponse<{ message: string }>>(
      `${this.apiUrl}/reset`,
      {}
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Get booking statistics
   */
  getBookingStats(): Observable<ApiResponse<BookingStats>> {
    return this.http.get<ApiResponse<BookingStats>>(
      `${this.apiUrl}/stats`
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.error || error.message || 'Server error';
    }

    console.error('BookingService Error:', errorMessage);
    return throwError(() => error);
  }
}