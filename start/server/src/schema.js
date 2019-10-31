// Features:
// - Fetch all upcoming rocket launches
// - Fetch a specific launch by its ID
// - Login the user
// - Book launch trips if the user is logged in
// - Cancel launch trips if the user is logged in

const { gql } = require('apollo-server');

const typeDefs = gql`
    # Schema goes here

    # Initial gateway into our Graph, used to get data
    type Query { 
        # Get a list of all launches ! means never null, the query should always return data
        launches: [Launch]!
        # Get a specific launch by ID
        launch(id: ID!): Launch
        # Queries for the current user
        me: User
    }

    # Defining the Launch object type; contains a list of Scalar(ID, String, Boolean) and Object(Mission, Rocket) types.
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    # Rocket object definition
    type Rocket {
        id: ID!
        name: String
        type: String
    }

    # User object definition
    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    # Mission type definition
    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    type Mutation {
        # if false, booking trips failed -- check errors
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        # if false, cancellation failed -- check errors
        cancelTrip(launchId: ID!): TripUpdateResponse!
        # login token
        login(email: String): String
    }

    # Response type to a user booking/canceling a trip
    type TripUpdateResponse {
        # check to see if book/cancel was successful, if not, do X
        success: Boolean!
        # the succ/fail response
        message: String
        # response of a list of launches
        launches: [Launch]
    }

    # PatchSize type definition to be used for Missions
    enum PatchSize {
        SMALL
        LARGE
    }

`;

module.exports = typeDefs;