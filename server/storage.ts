import { 
  type User, 
  type InsertUser,
  type Vehicle,
  type InsertVehicle,
  type VehicleImage,
  type InsertVehicleImage,
  type Booking,
  type InsertBooking,
  type Review,
  type InsertReview,
  users,
  vehicles,
  vehicleImages,
  bookings,
  reviews
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Vehicle methods
  getVehicles(filters?: {
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    transmission?: string;
    features?: string[];
  }): Promise<(Vehicle & { images: VehicleImage[] })[]>;
  getVehicle(id: string): Promise<(Vehicle & { images: VehicleImage[] }) | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: string): Promise<boolean>;

  // Vehicle Image methods
  createVehicleImage(image: InsertVehicleImage): Promise<VehicleImage>;
  getVehicleImages(vehicleId: string): Promise<VehicleImage[]>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  getUserBookings(userId: string): Promise<Booking[]>;
  getVehicleBookings(vehicleId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;

  // Review methods
  createReview(review: InsertReview): Promise<Review>;
  getVehicleReviews(vehicleId: string): Promise<Review[]>;
  updateVehicleRating(vehicleId: string): Promise<void>;
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Vehicle methods
  async getVehicles(filters?: {
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    transmission?: string;
    features?: string[];
  }): Promise<(Vehicle & { images: VehicleImage[] })[]> {
    let query = db.select().from(vehicles);
    
    const conditions = [];
    if (filters?.minPrice) {
      conditions.push(gte(vehicles.pricePerDay, filters.minPrice));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(vehicles.pricePerDay, filters.maxPrice));
    }
    if (filters?.category) {
      conditions.push(eq(vehicles.category, filters.category));
    }
    if (filters?.transmission) {
      conditions.push(eq(vehicles.transmission, filters.transmission));
    }
    if (filters?.features && filters.features.length > 0) {
      conditions.push(sql`${vehicles.features} @> ${filters.features}`);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const vehicleList = await query;
    
    const vehiclesWithImages = await Promise.all(
      vehicleList.map(async (vehicle) => {
        const images = await this.getVehicleImages(vehicle.id);
        return { ...vehicle, images };
      })
    );

    return vehiclesWithImages;
  }

  async getVehicle(id: string): Promise<(Vehicle & { images: VehicleImage[] }) | undefined> {
    const result = await db.select().from(vehicles).where(eq(vehicles.id, id));
    if (!result[0]) return undefined;
    
    const images = await this.getVehicleImages(id);
    return { ...result[0], images };
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const result = await db.insert(vehicles).values(insertVehicle).returning();
    return result[0];
  }

  async updateVehicle(id: string, vehicleUpdate: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const result = await db.update(vehicles)
      .set(vehicleUpdate)
      .where(eq(vehicles.id, id))
      .returning();
    return result[0];
  }

  async deleteVehicle(id: string): Promise<boolean> {
    const result = await db.delete(vehicles).where(eq(vehicles.id, id)).returning();
    return result.length > 0;
  }

  // Vehicle Image methods
  async createVehicleImage(insertImage: InsertVehicleImage): Promise<VehicleImage> {
    const result = await db.insert(vehicleImages).values(insertImage).returning();
    return result[0];
  }

  async getVehicleImages(vehicleId: string): Promise<VehicleImage[]> {
    return await db.select().from(vehicleImages).where(eq(vehicleImages.vehicleId, vehicleId));
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(insertBooking).returning();
    return result[0];
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async getVehicleBookings(vehicleId: string, startDate: Date, endDate: Date): Promise<Booking[]> {
    return await db.select()
      .from(bookings)
      .where(
        and(
          eq(bookings.vehicleId, vehicleId),
          lte(bookings.startDate, endDate),
          gte(bookings.endDate, startDate)
        )
      );
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const result = await db.update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return result[0];
  }

  // Review methods
  async createReview(insertReview: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(insertReview).returning();
    await this.updateVehicleRating(insertReview.vehicleId);
    return result[0];
  }

  async getVehicleReviews(vehicleId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.vehicleId, vehicleId));
  }

  async updateVehicleRating(vehicleId: string): Promise<void> {
    const vehicleReviews = await this.getVehicleReviews(vehicleId);
    const avgRating = vehicleReviews.reduce((sum, r) => sum + r.rating, 0) / vehicleReviews.length;
    
    await db.update(vehicles)
      .set({ 
        rating: avgRating.toFixed(1),
        reviewCount: vehicleReviews.length 
      })
      .where(eq(vehicles.id, vehicleId));
  }
}

export const storage = new PostgresStorage();
