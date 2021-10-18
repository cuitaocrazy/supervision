package internal

import (
	"sync"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate
var once sync.Once

func GetValidate() *validator.Validate {
	once.Do(func() {
		validate = validator.New()
	})
	return validate
}
