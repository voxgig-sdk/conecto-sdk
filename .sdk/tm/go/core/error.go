package core

type ConectoError struct {
	IsConectoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewConectoError(code string, msg string, ctx *Context) *ConectoError {
	return &ConectoError{
		IsConectoError: true,
		Sdk:              "Conecto",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ConectoError) Error() string {
	return e.Msg
}
