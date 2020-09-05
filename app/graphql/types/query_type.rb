module Types
  class QueryType < Types::BaseObject

    field :students, [Types::StudentType], null: false
    field :current_student, Types::StudentType, null: false
    field :jitsi_code, GraphQL::Types::BigInt, null: false
    
    def students
      Student.all
    end

    def current_student #TODO: implement current student
      Student.find(1)
    end

    def jitsi_code
      Interactors::GenerateJitsiCode.call.jitsi_code
    end
  end
end
