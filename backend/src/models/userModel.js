class User {
    constructor(data) {
        this.id = data.id || null;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password = data.password || null;
        this.phone = data.phone || null;
        this.dob = data.dob ? new Date(data.dob).toISOString().split('T')[0] : null;
        this.gender = data.gender || null;
        this.address = data.address || null;
        this.role = data.role;
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

    validate() {
        if (!this.first_name || !this.last_name || !this.email) {
            throw new Error('First name, last name, and email are mandatory fields.');
        }

        const validRoles = ['super_admin', 'artist_manager', 'artist'];
        if (!validRoles.includes(this.role)) {
            throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
        }

        if (this.gender && !['male', 'female', 'other'].includes(this.gender)) {
            throw new Error("Gender must be 'male', 'female', or 'other'.");
        }
    }

    toJSON() {
        const copy = { ...this };
        delete copy.password;
        return copy;
    }
}

module.exports = User;