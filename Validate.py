

class Validate():
    
    def required(data, values):
        errors = []
        for value in values:
            if value not in data:
                errors.append(value)
            elif len(data[value]) == 0:
                errors.append(value)
        if len(errors) > 0:
            return {
                'status':False,
                'errors':errors
            }
        return {
            'status':True
        }
