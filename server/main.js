import '../imports/startup/server'

import { Foo } from 'api/foo'

Meteor.startup(() => {
    // code to run on server at startup
    if (Meteor.users.find({ 'emails.address': 'tonymckendry@gmail.com' }).count() == 0) {
        let user = {
            createdAt: new Date(),
            services: {
                password: {
                    bcrypt: '$2a$10$fPUIYjVY6Rnmiimcdr/Fp.FiChtd2srolvuD9Yr6/LcTTt2xZW6m2'
                }
            },
            emails: [
                {
                    address: 'tonymckendry@gmail.com',
                    verified: false
                }
            ],
            profile: {
                firstName: 'Tony',
                lastName: 'McKendry'
            }
        }
        Meteor.users.insert(user)
    }
    if (Foo.find({}).count() < 1) {
        Foo.insert({ bar: 'Hello' })
    }
});
