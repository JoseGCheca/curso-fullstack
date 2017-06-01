<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use \BackendBundle\Entity\User;

class UserController extends Controller {

    public function newAction(Request $request) {
        $json = $request->request->get("json", null);
        $params = json_decode($json);
        $data = array(
            "status" => "error",
            "code" => 400,
            "msg" => "User not created"
        );
        if ($json != null) {
            $createdAt = new \DateTime("now");
            $image = null;
            $role = "user";
            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;
            $name = (isset($params->name) && preg_match('/^[\p{Latin}\s]+$/u', $params->name)) ? $params->name : null;
            $surname = (isset($params->surname) && preg_match('/^[\p{Latin}\s]+$/u', $params->surname)) ? $params->surname : null;

            $emailConstraint = new Assert\Email();
            $emailConstraint->message = "This email is not valid !!";
            $validate_email = $this->get("validator")->validate($email, $emailConstraint);
            var_dump($email);
            var_dump($password);
            var_dump($surname);
            var_dump($name);
            if (count($validate_email) == 0 && $email != null && $password != null && strlen(trim($name)) > 0 && strlen(trim($surname)) > 0) {
                $user = new User();
                $user->setCreatedAt($createdAt);
                $user->setImage($image);
                $user->setRole($role);
                $user->setEmail($email);
                $user->setName($name);
                $user->setSurname($surname);

                //Cifrar contraseña
                $pwd = hash('sha256', $password);

                $user->setPassword($pwd);

                $em = $this->getDoctrine()->getManager();
                $isset_user = $em->getRepository("BackendBundle:User")->findBy(
                        array(
                            "email" => $email
                ));

                if (count($isset_user) == 0) {
                    $em->persist($user);
                    $em->flush();
                    $data["status"] = 'success';
                    $data["code"] = 200;
                    $data["msg"] = 'New user created!!';
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "User not created, duplicated"
                    );
                }
            }
        }
        return $this->json($data);
    }

    public function editAction(Request $request) {




        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->get('authorization', null);
        $check = $jwt_auth->checkToken($hash);

        if ($check == true) {

            $identity = $jwt_auth->checkToken($hash, true);
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository("BackendBundle:User")->findOneBy(array(
                "id" => $identity->sub
            ));
            $json = $request->request->get("json", null);
            $params = json_decode($json);
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "User not updated"
            );
            if ($json != null) {
                $createdAt = new \DateTime("now");
                $image = null;
                $role = "user";
                $email = (isset($params->email)) ? $params->email : null;
                $password = (isset($params->password)) ? $params->password : null;
                $name = (isset($params->name) && preg_match('/^[\p{Latin}\s]+$/u', $params->name)) ? $params->name : null;
                $surname = (isset($params->surname) && preg_match('/^[\p{Latin}\s]+$/u', $params->surname)) ? $params->surname : null;

                $emailConstraint = new Assert\Email();
                $emailConstraint->message = "This email is not valid !!";
                $validate_email = $this->get("validator")->validate($email, $emailConstraint);
                var_dump($email);
                var_dump($password);
                var_dump($surname);
                var_dump($name);
                if (count($validate_email) == 0 && $email != null && strlen(trim($name)) > 0 && strlen(trim($surname)) > 0) {

                    $user->setCreatedAt($createdAt);
                    $user->setImage($image);
                    $user->setRole($role);
                    $user->setEmail($email);
                    $user->setName($name);
                    $user->setSurname($surname);

                    if ($password != null) {
                        //Cifrar contraseña
                        $pwd = hash('sha256', $password);
                        $user->setPassword($pwd);
                    }
                    $em = $this->getDoctrine()->getManager();
                    $isset_user = $em->getRepository("BackendBundle:User")->findBy(
                            array(
                                "email" => $email
                    ));

                    if (count($isset_user) == 0 || $identity->email == $email) {
                        $em->persist($user);
                        $em->flush();
                        $data["status"] = 'success';
                        $data["code"] = 200;
                        $data["msg"] = 'User updated!!';
                    } else {
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "User not updated"
                        );
                    }
                }
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "Authorization not valid"
            );
        }
        return $this->json($data);
    }

    public function uploadImageAction(Request $request) {
        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->request->get("authorization", null);
        $check = $jwt_auth->checkToken($hash);

        if ($check == true) {
            $identity = $jwt_auth->checkToken($hash, true);
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository("BackendBundle:User")->findOneBy(array(
                "id" => $identity->sub
            ));

            //upload file

            $file = $request->files->get("image");
            if (!empty($file) && $file != null) {
                $ext = $file->guessExtension();
                if ($ext == "jpeg" || $ext == "jpg" || $ext == "png" || $ext == "gif") {
                    $file_name = time() . "." . $ext;
                    $file->move("uploads/users", $file_name);

                    $user->setImage($file_name);
                    $em->persist($user);
                    $em->flush();
                    $data = array(
                        "status" => "success",
                        "code" => 200,
                        "msg" => "Image for user upload succeeded"
                    );
                } else {
                    $data = array(
                        "status" => "ERROR",
                        "code" => 400,
                        "msg" => "File not valid"
                    );
                }
            } else {

                $data = array(
                    "status" => "success",
                    "code" => 200,
                    "msg" => "Image not uploaded"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "Authorization not valid"
            );
        }
        return $this->json($data);
    }

}
