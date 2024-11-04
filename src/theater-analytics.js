const { DateTime } = require('luxon');

class TheaterAnalytics {
    constructor(db) {
        this.db = db;
    }

    validateDate(dateStr) {
        const formats = ['yyyy-MM-dd', 'M/d/yyyy', 'dd-MM-yyyy'];
        
        for (const format of formats) {
            const dt = DateTime.fromFormat(dateStr, format);
            if (dt.isValid) return dt.toISODate();
        }
        
        throw new Error('Invalid date format. Please use YYYY-MM-DD or MM/DD/YYYY');
    }

    async getTopPerformingTheater(dateStr) {
        try {
            const date = this.validateDate(dateStr);

            const query = `
                SELECT 
                    t.theater_id,
                    t.name as theater_name,
                    t.location,
                    SUM(ds.total_sales) as total_daily_sales,
                    SUM(ds.tickets_sold) as total_tickets_sold
                FROM theaters t
                JOIN daily_sales ds ON t.theater_id = ds.theater_id
                WHERE ds.sale_date = ?
                GROUP BY t.theater_id, t.name, t.location
                ORDER BY total_daily_sales DESC
                LIMIT 1
            `;

            const result = await this.db.get(query, [date]);

            if (!result) {
                throw new Error('No sales data found for the specified date');
            }

            return result;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = TheaterAnalytics;